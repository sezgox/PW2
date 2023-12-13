const router = require('express').Router();
const Note = require('..\\models\\Note');
const { isAuthenticated } = require ('..\\helpers\\auth');

router.get('/notes/add', isAuthenticated, (req,res)=>{
    res.render('notes\\add-note');
});

router.post('/notes/new-note', isAuthenticated,async (req,res)=>{
    const { title, description }= req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Please type a title'});
    }
    if(!description){
        errors.push({text: 'Please type a description'});
    }
    if(errors.length > 0){
        for(i=0;i<errors.length;i++){

        }
        res.render('notes\\add-note', {errors});
    }else{
       const newNote = new Note({title,description});
       newNote.user = req.user.id;
       await newNote.save();
       res.redirect('/notes');
    }
});

router.get('/notes', isAuthenticated, async (req,res)=>{
    const notes = await Note.find({user: req.user.id}).sort({date:'desc'});
    res.render('notes\\all-notes', {notes});
});

router.get('/notes/edit/:id',isAuthenticated, async (req,res) => {

    const note = await Note.findById(req.params.id);
    res.render('notes\\edit-notes',{note});
});

router.put('/notes/edit-note/:id',isAuthenticated, async (req,res) => {
    const {title, description}=req.body;
    await Note.findByIdAndUpdate(req.params.id, {title,description});
    res.redirect('/notes');
});

router.delete('/notes/delete/:id',isAuthenticated, async (req,res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
})

module.exports = router;