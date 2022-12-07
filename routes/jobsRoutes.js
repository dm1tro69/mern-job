import {Router} from "express";
import {deleteJob, getAllJobs, showStats, updateJob} from "../controllers/jobsControllers.js";
import {authenticateUser} from "../middleware/auth.js";

const router = Router()

router.route('/').get(getAllJobs)
router.route('/stats').get(authenticateUser,showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router
