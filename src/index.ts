import express, { Request, Response, request, response } from "express"
import { Iuser } from './type/type.user'
import { v4 as uuidv4 } from 'uuid';
import { connectDB } from "./config/db";
import { ClassRoom, PrismaClient, Student, Teacher } from "@prisma/client";
//------------------------o----------</\>-----------o-------------------------\\
const prisma = new PrismaClient()
const app = express()
app.use(express.json())
const port = 3000


connectDB()

app.post('/addteacher',async  (req: Request, res: Response) => {
    const newTeacher = req.body as Teacher;

    await prisma.teacher.create({
        data: newTeacher
    });
    return res.json('Teacher added');
});
app.get('/getallteacher', async (req: Request, res: Response) => {
const getallteacher = await prisma.teacher.findMany()
return res.json(getallteacher)
})
//------------------------o----------</\>-----------o-------------------------\\

app.post('/addStudent',async  (req, res) => {
    const newStudent = req.body as Student;

    await prisma.student.create({
        data: newStudent
    });
    return res.json('Student added');
});
app.get('/getallStudent', async (req: Request, res: Response) => {
const getallstudent = await prisma.student.findMany()
return res.json(getallstudent)

})
//------------------------o----------</\>-----------o-------------------------\\
app.post('/addClassroom',async  (req, res) => {
    const newclass = req.body as ClassRoom;

    await prisma.classRoom.create({
        data: newclass
    });
    return res.json('Class Created');
});
app.get('/getallClasses', async (req: Request, res: Response) => {
const getallClasses = await prisma.classRoom.findMany()
return res.json(getallClasses)
})
//------------------------o----------</\>-----------o-------------------------\\
app.get('/classRoom/:id',async(req:Request,res:Response)=>{
    const {id} = req.params
    const userId = await prisma.classRoom.findMany({
     where:{
        id:id,
     },select:{
        name:true,
        teacher:true,
        student:true

     }
    })
      res.json(userId);
})

//------------------------o----------</\>-----------o-------------------------\\

app.listen(port, () => {
    console.log(' server listing 3000');

})

