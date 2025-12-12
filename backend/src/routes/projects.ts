import { Router } from 'express'
import { getAllProjects, createProject, getProjectById, updateProject, deleteProject } from '../controllers/projectsController'

const router = Router()

router.get('/', getAllProjects)
router.post('/', createProject)
router.get('/:id', getProjectById)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)

export default router


