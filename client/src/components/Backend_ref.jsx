let backend_ref;
if (process.env.NODE_ENV  === 'production') {
    backend_ref = "https://bandhejhub.onrender.com"
}
else if (process.env.NODE_ENV  === 'development') {
    backend_ref = "http://localhost:5000"
}
// ACTIVATE IF YOU ARE USING PRODUCTION SERVER (PUSH WITH IT)

backend_ref = "https://bandhejhub.onrender.com"

export default backend_ref