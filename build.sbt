organization := "ppro"
name := "omnimedia"
version := "0.0.1-SNAPSHOT"
scalaVersion := "2.12.2"

val Http4sVersion = "0.15.13a"
val circeVersion = "0.8.0"

libraryDependencies ++= Seq(
  "org.http4s" %% "http4s-blaze-server" % Http4sVersion,
  "org.http4s" %% "http4s-circe" % Http4sVersion,
  "org.http4s" %% "http4s-dsl" % Http4sVersion,
  "ch.qos.logback" % "logback-classic" % "1.2.1",
  "com.typesafe.slick" %% "slick" % "3.2.0",
  "com.typesafe" % "config" % "1.3.1",
  "org.slf4j" % "slf4j-nop" % "1.6.4",
  "org.postgresql" % "postgresql" % "9.3-1100-jdbc4",
  "io.circe" %% "circe-core" % circeVersion,
  "io.circe" %% "circe-generic" % circeVersion,
  "io.circe" %% "circe-parser" % circeVersion,
  "com.roundeights" %% "hasher" % "1.2.0",
  "io.verizon.delorean" %% "core" % "1.2.40-scalaz-7.2"
)

resolvers ++= Seq("jBCrypt Repository" at "http://repo1.maven.org/maven2/org/")

libraryDependencies ++= Seq("org.mindrot" % "jbcrypt" % "0.3m")

