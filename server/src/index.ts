import  express  from "express";


const app = express();
const port = process.env.PORT;

app.listen(port , () => {
    console.log(`server is running at port number ${port}`)
})

// import prisma from "./utils/prisma";

// async function test() {
//   const users = await prisma.user.findMany();
//   console.log(users);
// }

// test();