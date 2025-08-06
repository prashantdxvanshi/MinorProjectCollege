import axios from "axios";
import { atom, selector } from "recoil";
export const adminAtom=atom({
    key:"adminAtom",
    default:"Dashboard"
})
 
export const tokenAtom=atom({
    key:"tokenAtom",
    default:0
})