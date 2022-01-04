import { ObjectId } from "mongodb";


export default class Info {
  constructor(
    public _id: ObjectId,
    public Fullname: string,
    public Email: string,
    public Password: string,
    public Status: string
  ) {}
}
