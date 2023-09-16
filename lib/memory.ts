import { Redis } from "@upstash/redis";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";

export type SageKey = {
  sageName: string;
  modelName: string;
  userId: string;
};

export class MemoryManager {
  private static instance: MemoryManager;
  private history: Redis;
  private vectorDBClient: PineconeClient;

  public constructor() {
    // Initialize the Redis client for storing chat history
    this.history = Redis.fromEnv();

    // Initialize the Pinecone client for vector search
    this.vectorDBClient = new PineconeClient();
  }

  public async init() {
    // Initialize the Pinecone client with the API key and environment
    if (this.vectorDBClient instanceof PineconeClient) {
      await this.vectorDBClient.init({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINECONE_ENVIRONMENT!,
      });
    }
  }

  public async vectorSearch(
    recentChatHistory: string,
    sageFileName: string
  ) {
    const pineconeClient = <PineconeClient>this.vectorDBClient;

    // Get the Pinecone index for vector search
    const pineconeIndex = pineconeClient.Index(
      process.env.PINECONE_INDEX! || ""
    );

    // Create a vector store using OpenAI embeddings and the Pinecone index
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
      { pineconeIndex }
    ); 

    // Perform similarity search on the vector store
    const similarDocs = await vectorStore
      .similaritySearch(recentChatHistory, 3, { fileName: sageFileName })
      .catch((err) => {
        console.log("WARNING: failed to get vector search results.", err);
      });
    return similarDocs;
  }

  public static async getInstance(): Promise<MemoryManager> {
    // Singleton pattern to ensure only one instance of MemoryManager is created
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
      await MemoryManager.instance.init();
    }
    return MemoryManager.instance;
  }

  private generateRedisSageKey(sageKey: SageKey): string {
    // Generate a unique key for storing chat history in Redis
    return `${sageKey.sageName}-${sageKey.modelName}-${sageKey.userId}`;
  }

  public async writeToHistory(text: string, sageKey: SageKey) {
    // Check if the sageKey is set correctly
    if (!sageKey || typeof sageKey.userId == "undefined") {
      console.log("Sage key set incorrectly");
      return "";
    }
  
    // Generate the Redis key for storing chat history
    const key = this.generateRedisSageKey(sageKey);
  
    // Add the chat message to the Redis sorted set with the current timestamp as the score
    const result = await this.history.zadd(key, {
      score: Date.now(),
      member: text,
    });
  
    return result;
  }
  
  public async readLatestHistory(sageKey: SageKey): Promise<string> {
    // Check if the sageKey is set correctly
    if (!sageKey || typeof sageKey.userId == "undefined") {
      console.log("Sage key set incorrectly");
      return "";
    }
  
    // Generate the Redis key for retrieving chat history
    const key = this.generateRedisSageKey(sageKey);
  
    // Retrieve the latest chat history from Redis, sorted by score (timestamp)
    let result = await this.history.zrange(key, 0, Date.now(), {
      byScore: true,
    });
  
    // Limit the number of chat messages to 30 and reverse the order
    result = result.slice(-30).reverse();
  
    // Join the chat messages with a newline character
    const recentChats = result.reverse().join("\n");
  
    return recentChats;
  }
  
  public async seedChatHistory(
    seedContent: String,
    delimiter: string = "\n",
    sageKey: SageKey
  ) {
    // Generate the Redis key for checking if chat history already exists
    const key = this.generateRedisSageKey(sageKey);
  
    // Check if the chat history already exists for the user
    if (await this.history.exists(key)) {
      console.log("User already has chat history");
      return;
    }
  
    // Split the seed content into individual chat messages using the delimiter
    const content = seedContent.split(delimiter);
  
    let counter = 0;
    for (const line of content) {
      // Add each chat message to the Redis sorted set with a counter as the score
      await this.history.zadd(key, { score: counter, member: line });
      counter += 1;
    }
  }
}