package ppro.omnimedia

import java.util.concurrent.{ExecutorService, Executors}

import scala.util.Properties.envOrNone

import scalaz.concurrent.Task

import org.http4s.server.{Server, ServerApp}
import org.http4s.server.blaze.BlazeBuilder
import slick.jdbc.PostgresProfile.api._


object MyServer extends ServerApp {

  val port : Int              = envOrNone("HTTP_PORT") map (_.toInt) getOrElse 8080
  val ip   : String           = "0.0.0.0"
  val pool : ExecutorService  = Executors.newCachedThreadPool()
  val connectionUrl = "jdbc:postgresql://jrfcabral.me/omnimedia?user=omnimedia&password=N4MxixTqan"
  val database = Database.forURL(connectionUrl, driver="org.postgresql.Driver")
  val users = TableQuery[User];
  val local_servers = TableQuery[LocalServer];
  val setup =DBIO.seq(
    users.schema.create,
    local_servers.schema.create
  )
  database.run(setup)

  override def server(args: List[String]): Task[Server] =
    BlazeBuilder
      .bindHttp(port, ip)
      .mountService(UserService.service)
      .withServiceExecutor(pool)
      .start
}
