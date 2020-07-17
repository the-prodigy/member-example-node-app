const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const members = require('../../Members')

router.get('/', (req,res) => res.json(members))

// Get single member
router.get('/:id', (req,res) => {
	const found = members.some(member => member.id === parseInt(req.params.id))

	if (found){
		res.json(members.filter(member => member.id === parseInt(req.params.id)))
	} else {
		res.status(404).json({ msg: 'Member not found'})
	}

})

// Create Member
router.post('/', (req, res) => {
	const newMember = {
		id: uuid.v4(),
		name: req.body.name,
		email: req.body.email,
		status: 'active'
	}

	if (!newMember.name || !newMember.email) {
		return res.status(400).json({ msg: 'Please include a name and email' })
	} 

	members.push(newMember)
	res.json(members)
	//res.redirect('/')
})


// Update member
// Update a member
router.put('/:id', (req,res) => {
	const found = members.some(member => member.id === parseInt(req.params.id))

	if (found){
		const updMember = req.body
		members.forEach(member => {
			if (member.id === parseInt(req.params.id)){
				// Set new name, otherwise take old name or email
				member.name = updMember.name ? updMember.name : member.name
				member.email = updMember.email ? updMember.email : member.email

				res.json({ msg: 'Member updated', member })
			}
		})
	} else {
		res.status(404).json({ msg: 'Member not found'})
	}

})

// Get single member
router.delete('/:id', (req,res) => {
	const found = members.some(member => member.id === parseInt(req.params.id))

	if (found){
		res.json({ msg: 'Member deleted', 
		members: members.filter(member => member.id !== parseInt(req.params.id))
	   })
	} else {
		res.status(404).json({ msg: 'Member not found'})
	}

})

module.exports = router