package ppro.omnimedia

import io.circe._
import org.http4s._
import org.http4s.circe._
import org.http4s.dsl._
import org.http4s.Response
import io.circe.generic.auto._
import io.circe.syntax._


import io.circe.literal._

import scala.language.postfixOps
import Email._

object UserService {

  case class JwtToken(token: String)

  implicit val UserDecoder: Decoder[UserRequest] = Decoder.forProduct2("email", "password")(UserRequest)
  implicit val HelloEncoder: Encoder[JwtToken] =
    Encoder.instance { token: JwtToken =>
      json"""{"token": ${token.token}}"""
    }
  val service = HttpService {

    case req@POST -> Root / "user" => {
      req.as(jsonOf[UserRequest]) flatMap {
        case UserRequest(email, password) if email.validEmail => User.insertIfNotExists(email, password) flatMap {

          case true =>  Ok()
          case false => UnprocessableEntity()

        }

        case _ => BadRequest()
      }
    }

    case req@POST -> Root / "authentication" => {
      req.as(jsonOf[UserRequest]) flatMap {

        case UserRequest(email, password) if email.validEmail => {
          User.authenticate(email, password) flatMap {
            case true => {
              val jwtToken = JwtToken(JWT.generateToken(360, email)).asJson
              Ok(jwtToken)
            }
            case false => Forbidden()
          }
        }

        case _ => BadRequest()

      }

    }
  }
}
