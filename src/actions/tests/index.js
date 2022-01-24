const { Test } = require('../../db/models')

const getAll = async (req, res) => {
  try {
    const tests = await Test.findAll()

    res.send(tests)
  } catch (e) {
    res.send(e)
  }
}

const getOne = async (req, res) => {
  try {
    const requiredTest = await Test.findByPk(req.params.id)

    if (!requiredTest) return res.status(404).send()

    res.send(requiredTest)
  } catch (e) {
    res.send(e)
  }
}

const addOne = async (req, res) => {
  const test = req.body

  try {
    await Test.create(test)

    res.status(201).send(test)
  } catch (e) {
    res.send(e)
  }
}

const updateOne = async (req, res) => {
  try {
    const updatedTest = await Test.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!updatedTest) return res.status(404).send()

    res.send(updatedTest)
  } catch (e) {
    res.send(e)
  }
}

const deleteOne = async (req, res) => {
  try {
    const deletedTest = await Test.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!deletedTest) return res.status(404).send()

    res.code(204).send()
  } catch (e) {
    res.send({ error: e.message })
  }
}

module.exports = {
  getOne,
  getAll,
  addOne,
  updateOne,
  deleteOne
}
