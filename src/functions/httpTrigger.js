const { app, output } = require('@azure/functions');                                                                        
                                                                                                                              
  const queueOutput = output.storageQueue({                                                                                   
      queueName: 'myqueue',                                                                                                   
      connection: 'AzureWebJobsStorage',                                                                                      
  });                                                                                                                         
                                                                                                                              
  app.http('httpTrigger', {                                                                                                   
      methods: ['GET', 'POST'],                                                                                               
      authLevel: 'anonymous',                                                                                                 
      extraOutputs: [queueOutput],                                                                                            
      handler: async (request, context) => {                                                                                  
          const body = await request.text();                                                                                  
          const payload = body || 'default message';                                                                          
                                                                                                                              
          context.extraOutputs.set(queueOutput, payload);                                                                     
          context.log(`Message sent to queue: ${payload}`);                                                                   
                                                                                                                              
          return { body: `Message queued: ${payload}` };                                                                      
      },                                                                                                                      
  });                                                                                                                  