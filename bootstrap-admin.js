
require('dotenv').config();
const bcrypt=require('bcryptjs');
const {createClient}=require('@supabase/supabase-js');
(async()=>{
 const keys=['SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY','ADMIN_EMAIL','ADMIN_PASSWORD'];
 for(const k of keys) if(!process.env[k]) throw new Error(`Missing ${k}`);
 const db=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}});
 const email=process.env.ADMIN_EMAIL.toLowerCase(), password=process.env.ADMIN_PASSWORD;
 const hash=await bcrypt.hash(password,12);
 const {data,error}=await db.from('users').upsert({name:'مسؤول المنصة',email,password_hash:hash,role:'ADMIN',status:'ACTIVE',activated_at:new Date().toISOString()},{onConflict:'email'}).select('id,email,role,status').single();
 if(error) throw error; console.log('Admin ready:',data);
})().catch(e=>{console.error(e);process.exit(1)});
