import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Sidebar from "../components/Sidebar";

const containerStyle = {
    width: "100%",
    height: "500px",
};

const center = {
    lat: 36.75,
    lng: 3.06,
};

export default function CarteCamions({ camions, vendeurs }) {
    const [selected, setSelected] = React.useState(null);

    return (
        <LoadScript googleMapsApiKey="TA_CLE_GOOGLE_MAPS">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
                {camions
                    .filter((c) => c.latitude && c.longitude)
                    .map((camion, i) => (
                        <Marker
                            key={i}
                            position={{ lat: camion.latitude, lng: camion.longitude }}
                            icon={{
                                url: camion.enLigne
                                    ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                                    : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                            }}
                            onClick={() => setSelected(camion)}
                        />
                    ))}

                {selected && (
                    <InfoWindow
                        position={{ lat: selected.latitude, lng: selected.longitude }}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div>
                            <p><strong>Camion:</strong> {selected.numero}</p>
                            <p><strong>Vendeur:</strong> {vendeurs.find((v) => v.id === selected.vendeurId)?.nom || "?"}</p>
                            <p><strong>Statut:</strong> {selected.enLigne ? "🟢 En ligne" : "🔴 Hors ligne"}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
}
