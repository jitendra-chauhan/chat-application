(async () => {
    const { getConfig } = await import("./connections/config");
    const { socketOps, httpServer, mongoOps } = await import("./connections");
  
    (async () => {
      try {
        console.debug("start int server ");
        await Promise.all([mongoOps.init(), socketOps()]);
  
        const { SERVER_PORT } = getConfig();
        httpServer.listen(SERVER_PORT, () => {
          console.log(`Server listening to the port ${SERVER_PORT}`);
        });
      } catch (error) {
        console.log(`Server listen error ${error}`);
      }
    })();
  
    process
      .on("unhandledRejection", (reason, p) => {
        console.error(
          reason,
          "Unhandled Rejection at Promise >> ",
          new Date(),
          " >> ",
          p
        );
      })
      .on("uncaughtException", (err) => {
        console.error("Uncaught Exception thrown", new Date(), " >> ", "\n", err);
      });
  })();
  