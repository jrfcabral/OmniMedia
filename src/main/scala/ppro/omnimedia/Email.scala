package ppro.omnimedia

/**
  * Created by joaof on 16/06/2017.
  */
object Email {
  implicit class EmailHelper(s: String){
    val regex = """\b[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-z‌​A-Z0-9-]+)*\b""".r
    def validEmail(): Boolean = s match {
      case regex() => true
      case _ => false
    }
  }
}
