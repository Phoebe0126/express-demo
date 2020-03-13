//让app.js调用路由
const express = require('express')
const fs = require('fs')
const router = express.Router()
let Student = require('./student.js')


router.get('/', (req, res) => {
        Student.find((err, students) => {
            if (err) {
                return res.status(500).send('server error')
            }
            res.render('index.html', {
                students: students
            })
        })
    

})
router.get('/students/new', (req, res) => {
    res.render('new.html')
})
//进入编辑页面
router.get('/students/edit', (req, res) => {
    let id = req.query.id
    Student.findById(parseInt(id), (err, student) => {
       if(err) {
           return res.status(500).send('server err')
       }
       
       res.render('edit.html', {
           student: student
       })
       
   })
})
// 1. 获取表单数据
// 2. 处理
//    将数据保存到 db.json 文件中用以持久化
// 3. 发送响应
router.post('/students/new', (req, res) => {
    //获取post的数据体 req.body
    Student.save(req.body, (err) => {
        if (err) {
            return res.status(500).send('server error')
        }
        //返回首页
        res.redirect('/')
    })
})
// 提交编辑修改之后的数据
router.post('/students/edit', (req, res) => {
    Student.updateData(req.body, (err) => {
        if (err) {
            return res.status(500).send('server err')
        }
        res.redirect('/')
    })
})
// 删除学生信息
router.get('/students/delete', (req, res) => {
    if (req.query.id) {
     Student.deleteData(req.query.id, (err)=> {
         if(err) {
             return res.status(500).send('server err')
         }
     })
     }
     res.redirect('/')
})
module.exports = router