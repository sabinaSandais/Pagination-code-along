const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'your-database-name';

// Collection Name
const collectionName = 'your-collection-name';

// Number of documents per page
const pageSize = 10;

// Get paginated results
async function getPaginatedResults(cursor) {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Fetch documents using the cursor
        const documents = await collection.find({ _id: { $gt: cursor } })
            .limit(pageSize)
            .toArray();

        // Get the next cursor
        const nextCursor = documents.length > 0 ? documents[documents.length - 1]._id : null;

        // Close the connection
        client.close();

        return {
            documents,
            nextCursor
        };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Usage example
async function main() {
    try {
        // Start with an initial cursor (e.g., null for the first page)
        let cursor = null;

        // Get the first page of results
        const result = await getPaginatedResults(cursor);

        // Process the documents
        console.log('Documents:', result.documents);

        // Use the next cursor to get the next page of results
        cursor = result.nextCursor;
        const nextPageResult = await getPaginatedResults(cursor);

        // Process the next page of documents
        console.log('Next Page Documents:', nextPageResult.documents);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the main function
main(); 