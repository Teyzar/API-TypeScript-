import { ObjectId } from "mongodb";


export default interface Info {
  _id: ObjectId,
  Fullname: string,
  Email: string,
  Password: string,
  Status: string
}

