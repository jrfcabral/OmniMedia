package ppro.omnimedia

import io.circe._
import org.http4s._
import org.http4s.circe._
import org.http4s.dsl._
import org.http4s.Response

import scala.language.postfixOps
import Email._

object UserService {
  //  implicit val UserDecoder: Decoder[UserRequest] = deriveDecoder[UserRequest]
  implicit val UserDecoder: Decoder[UserRequest] = Decoder.forProduct2[String, String, UserRequest]("email", "password")(UserRequest)

  val service = HttpService {
    case req@POST -> Root / "user" => {
      req.as(jsonOf[UserRequest]) flatMap {
        case UserRequest(email, password) if email.validEmail => User.insertIfNotExists(email, password) map {
          case true => new Response()
          case false => new Response(status = Status.UnprocessableEntity)
        }
        case _ => BadRequest()
      }
    }

    case req@POST -> Root / "authentication" => {
      req.as(jsonOf[UserRequest]) flatMap {
        case UserRequest(email, password) if email.validEmail => User.authenticate(email, password) map {
          case true => new Response()
          case false => new Response(status = Status.Forbidden)
        }
        case _ => BadRequest()
      }

    }
  }
}
