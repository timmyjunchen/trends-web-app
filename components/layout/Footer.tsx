import { Box, Divider, Text } from "@chakra-ui/react"
import React from "react"

const Footer = () => (
  <Box as="footer" px={4}>
    <Divider my={4} />
    <Text fontSize="sm" color="subtle">
      Created by Nidhi Mylavarapu (nm549), Sophie Wang (szw3), Timmy Li (tl674)
    </Text>
  </Box>
)

export default Footer
