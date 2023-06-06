const CrudTbl = require('../models/CrudTbl');

const fs = require('fs');

const index = (req,res) => {
    CrudTbl.find({}).then((user)=>{
        return res.render('form',{
            user,
            single : "",
        });
    }).catch((err)=>{
        console.log(err);
        return res.redirect('back');
    })
}

const addRecord = (req,res) => {
    const {name, director, writer, actors, language, country} = req.body;
    let editId = req.body.editid;
    if(editId){
        if(req.file){
            if(!name || !director || !writer || !actors || !language || !country){
                console.log("plese all field fill");
                return res.redirect('back');
            }
            //old image unlink
            CrudTbl.findById(editId)
            .then((deleteRecord)=>{
                fs.unlinkSync(deleteRecord.avatar);
            }).catch(err => console.log(err));
             //old image unlink

            //new image upload in folder
            let image = "";
            if(req.file){
                image = req.file.path;
            }
            //new image upload in folder
            CrudTbl.findByIdAndUpdate(editId,{
                name: name,
                director: director,
                writer: writer,
                actors: actors,
                language: language,
                country: country,
                avatar : image
            }).then((updateRecord)=>{
                console.log("Record successfully update");
                return res.redirect('/');
            }).catch(err => console.log(err));
            return res.redirect('/');
        }else{
            let image = "";
            CrudTbl.findById(editId)
            .then((deleteRecord)=>{
                image = deleteRecord.avatar;
                CrudTbl.findByIdAndUpdate(editId,{
                    name: name,
                    director: director,
                    writer: writer,
                    actors: actors,
                    language: language,
                    country: country,
                    avatar : image
                }).then((updateRecord)=>{
                    console.log("Record successfully update");
                    return res.redirect('/');
                }).catch(err => console.log(err));
                return res.redirect('/');
            }).catch(err => console.log(err));
        }
    }else{
        if(!name || !director || !writer || !actors || !language || !country){
            console.log("plese all field fill");
            return res.redirect('back');
        }
        let image = "";
        console.log(req.file.size);
        if(req.file){
            image = req.file.path;
        }
        CrudTbl.create({
            name: name,
            director: director,
            writer: writer,
            actors: actors,
            language: language,
            country: country,
            avatar : image
        }).then((data)=>{
            console.log("Record successfully insert");
            return res.redirect('back');
        }).catch((err)=>{
            console.log(err);
            return res.redirect('back');
        })
    }   
}

const deleteData = (req,res) => {
    let id = req.query.id;
    //file unlink start
    CrudTbl.findById(id)
    .then((deleteRecord)=>{
        fs.unlinkSync(deleteRecord.avatar);
    }).catch(err => console.log(err));
    //file unlink end

   CrudTbl.findByIdAndDelete(id)
   .then((data)=>{
        console.log("Record successfully delete");
        return res.redirect('back');
   }).catch((err)=>{
        console.log(err);
        return res.redirect('back');
   })
}

const editData = async(req,res) => {
    let id = req.query.id;
    let alldata = await CrudTbl.find({});
    CrudTbl.findById(id).then((single)=>{
      return res.render('form',{
            single,
            user : alldata
      })
    }).catch(err => console.log(err));
}

module.exports = {
        index,
        addRecord,
        deleteData,
        editData
}