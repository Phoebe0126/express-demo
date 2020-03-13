const fs = require('fs')

const dbPath ='./db.json'

/**
 * 获取学生列表
 * @param  {Function} callback 回调函数
 */

 exports.find = (callback) =>{
     fs.readFile(dbPath, (err, data) => {
         if (err) {
             return callback(err)
         }
         let students = JSON.parse(data).students
         for (let i in students) {
             let student = students[i]
             student.gender = Number.parseInt(student.gender)? '女' : '男'
         }
         callback(null, students)//json字符串转换成对象
     })
 }
 /**
 * 添加保存学生
 * @param  {Object}   student  学生对象
 * @param  {Function} callback 回调函数
 */
exports.save = (student, callback) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        student.id = parseInt(students[students.length-1].id) + 1
        //对象保存到数组
        students.push(student)
        //对象转化成json字符串
        let fileData = JSON.stringify({
            students: students
        })
        //保存到文件里
        fs.writeFile(dbPath, fileData, (err, data) => {
            if (err) {
                return callback(err)
            }
            // 成功返回空的err对象
             callback(null)
        })
        
    })
}
/**
 * 根据 id 获取学生信息对象
 * @param  {Number}   id       学生 id
 * @param  {Function} callback 回调函数
 */
exports.findById = (id, callback) =>{
    fs.readFile(dbPath, (err, data) => {
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students
        let ret = students.find((item) => {
            return item.id == id
        })
       // ret.gender = ret.gender? '女' : '男'
        callback(null, ret)
    })
}


/**
 * 根据 id 获取学生信息对象
 * @param  {Number}   name       学生 姓名
 * @param  {Function} callback 回调函数
 */
exports.findByName = (name, callback) =>{
    fs.readFile(dbPath, (err, data) => {
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students
        let ret = students.find((item) => {
            return item.name === name
        })
        console.log(ret)
     
       // ret.gender = ret.gender? '女' : '男'
        if (ret) {
            callback(null, ret)
        }
        return callback({err: 'err'})
        
    })
}

/**
 * 根据id修改文件里的学生信息
 * @param {Object}   student     要修改成的学生对象信息
 * @param {Function} callback    回调函数
 */
exports.updateData = (student, callback) => {
    fs.readFile(dbPath, (err, data) => {
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students
        let stu = students.find((item) => {
            return item.id == student.id
        })
        //循环变量修改对应学生的信息
        for (let key in stu) {
            stu[key] = student[key]
        }
        let fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, (err) => {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
   
// 删除学生信息
exports.deleteData = (id, callback) => {
    fs.readFile(dbPath, (err, data) => {
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students
        
        let deleteId = students.findIndex((item) => {
            return item.id == id
        })
        
        students.splice(deleteId, 1)
        let fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, (err) =>{
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}