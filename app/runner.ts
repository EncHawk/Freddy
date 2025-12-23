import {spawn} from 'child_process'

function inferPython(input:string){
    return new Promise((resolve,reject)=>{
        const process = spawn('python3',['script.py' , input])
        console.log('reached runner.ts')
        let result = ''
        let errOutput= ''
        process.stdout.on('data',data=>{
            result+=data.toString()
        })
        process.stderr.on('data',data=>{
            errOutput += data.toString()
        })
        process.on('close',(code)=>{
            if(code===0){
                resolve(result.trim())
            }
            else{
                reject(`process exited with code : ${code} and ${errOutput}`)
            }
        })
        console.log('left runner.ts')
    })
}
export default inferPython