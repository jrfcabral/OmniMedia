package ppro.omnimedia

import java.time.Instant

import io.circe._
import syntax._
import jawn.{parse => jawnParse}
import java.nio.file._
import java.security.KeyFactory
import java.security.spec.PKCS8EncodedKeySpec

import pdi.jwt.{Jwt, JwtAlgorithm, JwtClaim, JwtHeader, JwtOptions}
import pdi.jwt.JwtCirce

object JWT {
  def generateToken(expiration: Int, email: String): String = {
    val kf = KeyFactory.getInstance("RSA")
    val secretKey = kf.generatePrivate( new PKCS8EncodedKeySpec(Files.readAllBytes(Paths.get("src/main/resources/pkcs8_key"))))
    val algo = JwtAlgorithm.RS256
    val Right(claimJson) = jawnParse(s"""{"iat":${Instant.now.getEpochSecond},"exp": ${Instant.now.getEpochSecond+expiration}, "email": "${email}"}""")
    JwtCirce.encode(claimJson, secretKey, algo)
  }
}
