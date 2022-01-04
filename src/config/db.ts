
import dotenv from 'dotenv';
import * as MongoDB from "mongodb";


export const collections: { details?: MongoDB.Collection } = {}

export async function ConnectDB() {
    dotenv.config();

    const url = process.env.DB_URL;

    const client: MongoDB.MongoClient = new MongoDB.MongoClient(`${url}`);

    await client.connect(function(err) {
        if (err) console.log('Failed to Connect MongoDB');
        if (!err) {
            const db: MongoDB.Db = client.db(process.env.DB_NAME);

            const collection: MongoDB.Collection = db.collection(`${process.env.DB_COLLECTION}`);
        
            collections.details = collection;
        
         
            console.log(`Succesfuly Connected to database`);   
        }
    });
}