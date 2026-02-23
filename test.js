/*console.log('Hello world')

const http = require('http')

const host = 'localhost'
const port = 8000

const requestListner = function (req, res) {
    res.writeHead(200)
    res.end("my first server!")
}

const server = http.createServer(requestListner)
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})*/

const express = require('express') //require = คำสั่งนำ Library ที่ลงแล้วเข้ามา

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

const port = 8000

let users = []
let counter = 1


app.get('/', (req, res) => { // requst & response
  //res.send('Hello World! Hello World!')
  let user = {
    firstname: 'test',
    lastname: 'last',
    age: 15
  }
  res.json(user)
})

app.get('/users', (req, res) => {
  console.log('test')
  res.json(users)
})

// path = POST /user
app.post('/user', (req,res) => {
  let user = req.body
  user.id = counter
  counter += 1
  users.push(user)
  res.json({
    message: 'add ok',
    user: user
  })
}) 

// path = PUT /user/:id
app.put('/user/:id', (req,res) => {
  let id = req.params.id
  let updateUser = req.body

  // ค้นหาข้อมูล users
  let selectedIndex = users.findIndex(user => user.id == id)

  // update ข้อมูล user ( null || 'ค่าเดิม' )
  users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
  users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname

  res.json({
    message: 'update user complete!',
    data: {
      user: updateUser,
      indexUpdate: selectedIndex
    }
  })
})

// path = PATCH /user/:id
app.patch('/user/:id', (req,res) => {
  let id = req.params.id
  let updateUser = req.body

  // ค้นหาข้อมูล users
  let selectedIndex = users.findIndex(user => user.id == id)

  // update ข้อมูล user ( null || 'ค่าเดิม' )
  if ( updateUser.firstname ) {
    users[selectedIndex].firstname = updateUser.firstname
  }

  if ( updateUser.lastname ) {
    users[selectedIndex].lastname = updateUser.lastname
  }

  res.json({
    message: 'update user complete!',
    data: {
      user: updateUser,
      indexUpdate: selectedIndex
    }
  })
})

// path DELETE /users/:id
app.delete('/users/:id', (req,res) => {
  let id = req.params.id

  let selectedIndex = users.findIndex(user => user.id == id)
  
  // ลบ แบบให้เป็น null
  //delete users[selectedIndex]

  // ลบออกจาก array เลย
  users.splice(selectedIndex, 1)

  res.json({
    message: 'delete complete!',
    indexDeleted: selectedIndex
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port${port}`)
})


/* workshop
GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
GET /users/:id สำหรับการดึง users รายคนออกมา
PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป) */