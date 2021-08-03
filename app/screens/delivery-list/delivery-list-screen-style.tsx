import { ViewStyle, TextStyle, ImageStyle } from "react-native"
import { color, spacing } from "../../theme"

export const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}
export const FULL: ViewStyle = {
  flex: 1,
}
export const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
export const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
export const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
export const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
export const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
export const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
export const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4]
}
