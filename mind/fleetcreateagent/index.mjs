//node --experimental-modules index.mjs
import { Agent } from './agent';
import * as Globals from './globals';
var agentId = "saduhphle5tv7guxffo9p8191w94vae3azcix6lrtwif6j0549i342ctid3upn0e1zvhemai37p30vcr6eav1l9hxs9td1bg5dohyt1r9a97ni3xbmylnenq0otvmqfc5j7wh53mnsw1mb4ozms0cz3108rk9ffs46belgpgtl84swdyte5a7oafpg6jnsnhmd6pa0ds6mh118id4204jfuq65yfjg2a71spzyy3bmdvhior72pu2t7hsqteb7j0th3aq3ofe727b9ixrhhr1hio3k6jet1ddmbaooaeojq40agth5x4z29m8pgg7eaugy3y7iicgdcr1ny3emcj66olnzb9h4hki5ybgrv8wuxwzrvv0nbuc1yjkrlihi4m52j6zwww0dwlj1w5dpi42xhqgo0zgn0nzl07iz6e0o38fmat5pe2a9tiu2zk67qnmiw8bzxoteen3jl4oh30i8nz1rmpavh38qv70bsg1zi55gplr45zdzeo46htmho87kpnxoenyx8t0s4ucb7f0s0imhc4483tkk8v0cxd0sap1uxmcwrlkjhouhapljsz4oiqti49n4phskq1u02irsjbctatbh1qakvmmh232r7p3a6j0j5vrkhlegoaik8fd9hhyeon79qau4ibx031mf8zcjhf32vrt1m42zuv5sys4h0k8mmrqg37areo6iufn8r3roj8fh63rp55t7hqpdbm7p3lugzw8se6072udolijapvvj59bd0k6f5cu7o9sk58k9fwexna22c79izkkzu5249ubz9falz9eqkwej4nzzrec8dmidz3zagqauuoxiaqcd2s7cfa5hfdm5sdwx66v6jek4vuzpzrzab9fuof8y7s4ddfbr2ald5g3xidrvlprxom4t7ci08681kh0qthxzgvf4frmkynnsahy1lsuz1ue8hcnbmabe21r2g9np08bvtq0ds9fax77vrhwdek8xlj0jz6ulee93sso1lksm5bq446l8mklp9okkzrnvp36s7ec835232v2j26o3vv942u3eiec4777be7603mfrsswovar3cta34b0nk70y3765x0e49y9iqrmk7pthxi1n6ehdhtp6w";
var agent = new Agent(agentId);
console.log('created agent');


Globals.setDefaultUrl('http://192.168.1.109/').then(() => {
    console.log('set default url');
    var second = 1000;
     return agent.repeat(10*60 * second);
    // return agent.getShips().then(res => {
    //     console.log(res);
    //     console.log(res[0]);
    //     return agent.getShipMaterial(res[50].id).then(material => {
    //         if (material)
    //             console.log('material found')
    //         else {
    //             console.log('no material found');
    //         }
    //     }).then(() => {
    //         return agent.getShipModel(res[50].id).then(model => {
    //             if (model)
    //                 console.log('model found')
    //             else {
    //                 console.log('no model found');
    //             }
    //         });
    //     });
    // }).catch(e => {
    //     console.log(e);
    // });
});