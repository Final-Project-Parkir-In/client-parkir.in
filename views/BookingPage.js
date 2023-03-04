import { Pressable, ScrollView, View, Text, StyleSheet, Image, TextInput } from "react-native";
import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';


const BookingPage = () => {
    const [search, onChangeSearch] = React.useState("")
    return (
        <ScrollView>
            <View style={style.container}>
                <View style={style.navigation}>
                    <TextInput
                        placeholder="🔍 Cari E-Tiket"
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={50}
                        value={search}
                        onChangeText={(search) => onChangeSearch(search)}
                        style={style.textInput}
                    />
                    <View style={style.cardTextProductFilter}>
                        <Pressable style={style.boxFilter}>
                            <Text style={{ color: '#ffff' }}>Berlangsung</Text>
                        </Pressable>
                        <Pressable style={style.boxFilter}>
                            <Text style={{ color: '#ffff' }}>Selesai</Text>
                        </Pressable>
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginStart: 100}}>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center'}}>
                            <Ionicons name="filter-outline" size={25} color='#ffc629'></Ionicons>
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center', marginLeft: 5 }}>
                            <Text>Filter</Text>
                        </View>
                        </View>
                    </View>
                </View>
                {/* <Pressable onPress={() => navigation.navigate()} style={style.cardTextProduct}>
                    <View style={style.boxProductImg}>
                        <Image source={{
                            uri: `https://images.tokopedia.net/img/JFrBQq/2022/6/24/7a369abd-409f-4faf-85bd-eb2b0e748e0d.jpg`
                        }} style={style.imageCardProduct} />
                    </View>
                    <View style={style.boxProduct}>
                        <Text style={style.textTitleProduct}>Title</Text>
                        <Text style={style.textProduct}>Description</Text>
                        <Text style={{ color: '#c4c4c4', fontSize: 13, marginTop: 5, textDecorationLine: 'underline' }}>Tap to see detail</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate()} style={style.cardTextProduct}>
                    <View style={style.boxProductImg}>
                        <Image source={{
                            uri: `https://images.tokopedia.net/img/JFrBQq/2022/6/24/7a369abd-409f-4faf-85bd-eb2b0e748e0d.jpg`
                        }} style={style.imageCardProduct} />
                    </View>
                    <View style={style.boxProduct}>
                        <Text style={style.textTitleProduct}>Title</Text>
                        <Text style={style.textProduct}>Description</Text>
                        <Text style={{ color: '#c4c4c4', fontSize: 13, marginTop: 5, textDecorationLine: 'underline' }}>Tap to see detail</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate()} style={style.cardTextProduct}>
                    <View style={style.boxProductImg}>
                        <Image source={{
                            uri: `https://images.tokopedia.net/img/JFrBQq/2022/6/24/7a369abd-409f-4faf-85bd-eb2b0e748e0d.jpg`
                        }} style={style.imageCardProduct} />
                    </View>
                    <View style={style.boxProduct}>
                        <Text style={style.textTitleProduct}>Title</Text>
                        <Text style={style.textProduct}>Description</Text>
                        <Text style={{ color: '#c4c4c4', fontSize: 13, marginTop: 5, textDecorationLine: 'underline' }}>Tap to see detail</Text>
                    </View>
                </Pressable> */}

                {/* Bila belum ada transaksi */}
                <Image source={{
                    uri: `https://www.mtwi.co.id/public/assets/images/not-found.png`
                }} style={{ flex: 5, width: '90%', height: 250, marginTop: '30%' }} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Belum ada transaksi</Text>
                <Text style={{fontSize: 13}}>Lakukan transaksi kamu dengan Parkir.In</Text>
                {/* Bila belum ada transaksi */}

            </View>
        </ScrollView>
    )
}

export default BookingPage

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
        alignContent: 'center'
    },
    navigation: { 
        flex: 1, 
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff', 
        width: '100%', 
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    boxFilter: {
        borderWidth: 1,
        padding: 8,
        marginLeft: 10,
        borderRadius: 100,
        borderColor: '#ffff',
        backgroundColor: "#E9A23B"
    },
    textInput: {
        width: '90%',
        height: 35,
        borderWidth: 0.5,
        borderRadius: 10,
        paddingLeft: 15,
        backgroundColor: '#ffff',
        color: 'black',
        marginTop: 20
    },
    cardTextProduct: {
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 5,
        flex: 1
    },
    cardTextProductFilter: {
        width: "90%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 15,
    },
    boxProduct: {
        width: '50%',
        padding: 7,
        marginLeft: 10
    },
    textTitleProduct: {
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 3,
        textAlign: 'left',
    },
    textProduct: {
        fontSize: 12
    },
    imageCardProduct: {
        width: '80%',
        height: 60,
        borderRadius: 10,
    },
    boxProductImg: {
        width: '30%',
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
})