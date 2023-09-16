# Sage AI

## Description
Every hero needs a sidekick! Sage AI is an intelligent assistant designed to help you with your daily tasks and make your life easier based on the context you specify.

## Features
- Custom Sages: Sage AI allows you to create custom AI sages based on the context and seed conversations you define.
- Intelligent task management: Sage AI can help you organize your tasks and prioritize them based on importance and deadlines [IN PROGRESS].
- Personalized recommendations: Sage AI learns from your preferences and conversations and provides tailored recommendations and responses the more you use it.
- Natural language processing: Communicate with Sage AI using natural language and receive accurate and relevant responses.

## Getting Started
To get started with Sage AI, follow these steps:

1. Clone the repository: `git clone https://github.com/AhmadBarake/sage-ai.git`
2. Install the required dependencies: `npm install`
3. Configure the necessary environment variables: 
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Key generated from CLERK
   - `CLERK_SECRET_KEY`: Key generated from CLERK
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: typically "/sign-in"
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: typically "/sign-up"
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: typically "/"
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: typically "/"
   - `DATABASE_URL`: add your prefered db URI
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: if you plan on using cloudinary [AWS S3 IN PROGRESS]
   - `PINECONE_INDEX`: Your index key from pinecone
   - `PINECONE_ENVIRONMENT`: Your environment name key from pinecone
   - `PINECONE_API_KEY`: Your API key from pinecone
   - `UPSTASH_REDIS_REST_URL`: retrieved from upstash
   - `UPSTASH_REDIS_REST_TOKEN`: retrieved from upstash
   - `OPENAI_API_KEY`: retrieved from OpenAI.
   - `REPLICATE_API_TOKEN`:retrieved from Replicate
   - `STRIPE_API_KEY`: retrieved from Stripe
4. Start the application: `npm run dev`

## Contributing
We welcome contributions from the community! If you'd like to contribute to Sage AI, please follow these guidelines:
- Fork the repository and create a new branch for your feature or bug fix.
- Submit a pull request with a clear description of your changes and the problem it solves.

## License
Sage AI is released under the MIT License. See [LICENSE](LICENSE) for more information.

## Contact
If you have any questions or suggestions, feel free to reach out to us at ahmad.barake@outlook.com.
`
