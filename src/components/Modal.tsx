import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import agenda from "../assets/agenda.png"
import router, { useRouter } from "next/router";
import { api } from "@/lib/axios";
export default function Modal({ isOpen, children, setModalOpen }) {
    if (isOpen) {
        return (
           children
        )
    }
    return null;

}