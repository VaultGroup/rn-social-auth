import React from "react"
import { Image, View } from "react-native"
import type { IconButtonProps } from "./props"
import { TouchHandlerView } from "./TouchHandlerView"


export const IconButton = (props: IconButtonProps) => {

    const padding = (props.height ?? 50) / 5

    const backgroundColour = (): string => {
        if (props.backgroundColour) {
            return props.backgroundColour
        } else {
            switch (props.logo) {

                case "apple":
                    return "black"
                    
                case "google":
                    return "white"

                case "facebook":
                    return "#1877F2"
            
                default:
                    return "white"
            }
        }
    }

    const borderColour = (): string => {
        switch (props.logo) {

            case "apple":
                return "black"
                
            case "google":
                return "#4285F4"

            case "facebook":
                return "#1877F2"
        
            default:
                return "black"
        }
    }

    const imageView = () => {

        switch (props.logo) {

            case "apple":
                return (
                    <View style={{padding: padding}}>
                        <Image height={1} width={1} source={require("../assets/a-logo-white.png")} style={{width: "100%", height: "100%"}} />
                    </View>
                )
                
            case "google":
                return (
                    <View style={{ padding: padding }}>
                        <Image height={1} width={1} source={require("../assets/g-logo.png")} style={{width: "100%", height: "100%"}} />
                    </View>
                )

            case "facebook":
                return (
                    <View style={{padding: padding}}>
                        <Image height={1} width={1} source={require("../assets/f-logo-white.png")} style={{width: "100%", height: "100%"}} />
                    </View>
                )
        
            default:
                return (
                    <View style={{ padding: padding}}>
                        <Image height={1} width={1} source={require("../assets/env.png")}  style={{width: "100%", height: "100%"}} />
                    </View>
                )
        }
    }

    return (
        <TouchHandlerView logo={props.logo} onPress={props.onPress} signInCallback={props.signInCallback}>
            <View style={{backgroundColor: backgroundColour(), height: props.height ?? 50, width: props.width ?? 50, borderRadius: 4, borderWidth: 1, borderColor: borderColour()}}>
                {imageView()}
            </View>
        </TouchHandlerView>
    )
}

