package ppro.omnimedia

import io.circe._
import org.http4s._
import org.http4s.circe._
import org.http4s.dsl._
import org.http4s.Response

import scala.language.postfixOps
import scalaz.concurrent.Task

object HelloWorld {
  //  implicit val UserDecoder: Decoder[UserRequest] = deriveDecoder[UserRequest]
  implicit val UserDecoder: Decoder[UserRequest] = Decoder.forProduct2[String, String, UserRequest]("email", "password")(UserRequest)

  val service = HttpService {
    case req@POST -> Root / "user" => {
      val user = req.as(jsonOf[UserRequest]).unsafePerformSync
      User.insertIfNotExists(user.email, user.password) map {
        case true => new Response()
        case false => new Response(status = Status.NotFound)
      }
    }
    case req@POST -> Root / "authentication" => {
      val user = req.as(jsonOf[UserRequest]).unsafePerformSync
      User.authenticate(user.email, user.password) map {
        case true => new Response()
        case false => new Response(status = Status.BadRequest)
      }

    }
  }
}
