const CrudTbl = require('../models/CrudTbl');

const fs = require('fs');

const index = async (req,res) => {
    try{
        let user = await CrudTbl.find({});
        if(user){
            return res.render('form',{
                user,
                single : "",
            });
        }
        else{
            console.log("data not found");
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

const addRecord = async (req,res) => {
    try {
        const {name, director, writer, actors, language, country} = req.body;
        let editId = req.body.editid;
        if(editId){
            if(req.file){
                if(!name || !director || !writer || !actors || !language || !country){
                    console.log("plese all field fill");
                    return res.redirect('back');
                }
                //old image unlink
                let deleteRecord = await CrudTbl.findById(editId);
                if(deleteRecord){
                    fs.unlinkSync(deleteRecord.avatar);
                }
                else{
                    console.log("file not dlt");
                }
                 //old image unlink
    
                //new image upload in folder
                let image = "";
                if(req.file){
                    image = req.file.path;
                }
                //new image upload in folder

                let updateRecord = await CrudTbl.findByIdAndUpdate(editId,{
                    name: name,
                    director: director,
                    writer: writer,
                    actors: actors,
                    language: language,
                    country: country,
                    avatar : image
                })
                if(updateRecord){
                    console.log("Record successfully update");
                    return res.redirect('/');
                }
                else{
                    console.log("not update");
                    return res.redirect('/');

                }
            }else{
                let image = "";

                let deleteRecord = await CrudTbl.findById(editId)
                if(deleteRecord){
                    image = deleteRecord.avatar;
                    let updateRecord = await CrudTbl.findByIdAndUpdate(editId,{
                        name: name,
                        director: director,
                        writer: writer,
                        actors: actors,
                        language: language,
                        country: country,
                        avatar : image
                    })
                    if(updateRecord){
                        console.log("Record successfully update");
                        return res.redirect('/');
                    }
                    else{
                        console.log("Not Update");
                    }
                }
                else{
                    console.log("record not fatch");
                    return res.redirect('/')
                }
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
            let data = CrudTbl.create({
                name: name,
                director: director,
                writer: writer,
                actors: actors,
                language: language,
                country: country,
                avatar : image
            })
            if(data){
                console.log("Record successfully insert");
                return res.redirect('back');
            }
            else{
                console.log("not insert");
                return res.redirect('back');
            }
        }     
    } 
    catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}

const deleteData = async (req,res) => {
    try{
    let id = req.query.id;
    //file unlink start
    let deleteRecord = await CrudTbl.findById(id);
     if(deleteRecord){
        fs.unlinkSync(deleteRecord.avatar);
    }
    else
    {
        console.log("data not deleted");
    }
    //file unlink end
    let data = await CrudTbl.findByIdAndDelete(id);
    if(data){
        console.log("Record successfully delete");
        return res.redirect('back');
    }
    else
    {
        console.log("data not found");
    }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

const editData = async(req,res) => {
    try{
        let id = req.query.id;
        let alldata = await CrudTbl.find({});
        let single = await CrudTbl.findById(id);
        if(single){
            return res.render('form',{
                  single,
                  user : alldata
            })
        }
        else{
            console.log("not fatch");
            return res.redirect('/')
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect('/')
    }
}

module.exports = {
        index,
        addRecord,
        deleteData,
        editData
}