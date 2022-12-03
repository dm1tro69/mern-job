import {Router} from "express";
import {deleteJob, getAllJobs, showStats, updateJob} from "../controllers/jobsControllers.js";

const router = Router()

router.route('/').get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router
