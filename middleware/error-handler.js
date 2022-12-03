

export const errorHandlerMiddleware = (err, req, res, next) => {
   res.status(500).json({message: 'there was an error'})
}
