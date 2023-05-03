import { Heading, Text } from "@chakra-ui/react"
import Layout from "../components/layout/Layout"

const IndexPage = () => (
  <Layout title="Home">
    <Heading my="4">
      My Trends A4 Project
    </Heading>
    <Text fontSize="md" my="3">
      I am busy so I made an app to keep track of my tasks.
    </Text>
    <Text fontSize="md" my="3">
      I worked on this assignment for 2 hours.
    </Text>
  </Layout>
)

export default IndexPage
