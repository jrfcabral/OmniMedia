package ppro.omnimedia

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape

import scala.concurrent.ExecutionContext.Implicits.global
import delorean._
import org.mindrot.jbcrypt._

import scalaz.concurrent.Task

class User(tag: Tag) extends Table[(Int, String, String)](tag, "USER") {

  case class User(email: String, password: String)

  def id: Rep[Int] = column[Int]("USER_ID", O.PrimaryKey, O.AutoInc)

  def email: Rep[String] = column[String]("USER_EMAIL", O.Unique)

  def hash: Rep[String] = column[String]("USER_HASH")

  def * : ProvenShape[(Int, String, String)] =
    (id, email, hash)
}

case class UserRequest(email: String, password: String)

object User {

  private val users = TableQuery[User]

  private def hashPassword(password: String): String =
    BCrypt.hashpw(password, BCrypt.gensalt(31))

  def insertIfNotExists(email: String, password: String): Task[Boolean] = {
    val hash = hashPassword(password)

    val query = users += (1, email, hash)
    val future = MyServer.database.run(query) map {
      _ => true
    } recover {
      case _ => false
    }
    future.toTask
  }

  def authenticate(email: String, password: String): Task[Boolean] = {
    val query = users.filter(_.email === email).take(1)
    val result = MyServer.database.run(query.result).map({
      case Seq((_, _, hash), _@_ *) => BCrypt.checkpw(password, hash)
    }).toTask
    result
  }
}