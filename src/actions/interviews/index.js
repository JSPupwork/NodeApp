const { Interview } = require('../../db/models')

const getAll = async (req, res) => {
  try {
    const interviews = await Interview.findAll()

    res.send(interviews)
  } catch (e) {
    res.send(e)
  }
}

const getOne = async (req, res) => {
  try {
    const requiredInterview = await Interview.findByPk(req.params.id)

    if (!requiredInterview) return res.status(404).send()

    res.send(requiredInterview)
  } catch (e) {
    res.send(e)
  }
}

const addOne = async (req, res) => {
  const interview = req.body

  try {
    await Interview.create(interview)

    res.status(201).send(interview)
  } catch (e) {
    res.send(e)
  }
}

const updateOne = async (req, res) => {
  try {
    const updatedInterview = await Interview.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!updatedInterview) return res.status(404).send()

    res.send(updatedInterview)
  } catch (e) {
    res.send(e)
  }
}

const deleteOne = async (req, res) => {
  try {
    const deletedInterview = await Interview.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!deletedInterview) return res.status(404).send()

    res.status(204).send()
  } catch (e) {
    res.send(e)
  }
}

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne
}
