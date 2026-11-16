 
  const { app, output } = require('@azure/functions');                                                                        
                                                                                                                              
  const tableOutput = output.table({                                                                                          
      tableName: 'mytable',                                                                                                   
      connection: 'AzureWebJobsStorage',                                                                                      
  });                                                                                                                         
                                                                                                                              
  app.storageQueue('queueTrigger', {                                                                                          
      queueName: 'myqueue',
      connection: 'AzureWebJobsStorage',                                                                                      
      extraOutputs: [tableOutput],                                                                                            
      handler: async (message, context) => {                                                                                  
          context.log(`Message received from queue: ${message}`);                                                             
                                                                                                                              
          const entity = {                                                                                                    
              partitionKey: 'messages',                                                                                       
              rowKey: Date.now().toString(),                                                                                  
              content: typeof message === 'string' ? message : JSON.stringify(message),                                       
          };                                                                                                                  
                                                                                                                              
          context.extraOutputs.set(tableOutput, entity);                                                                      
          context.log(`Written to table: ${JSON.stringify(entity)}`);
      },                                                                                                                      
  });      