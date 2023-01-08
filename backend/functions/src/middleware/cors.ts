import * as Cors from 'cors'

const cors = Cors({
    methods: 'GET,OPTIONS,POST,DELETE,HEAD,PATCH',
    preflightContinue: false
})

export default cors
