import express from "express";
import { IRoomsAndSpacesRepository } from "../repositories/interface/IRoomsAndSpacesRepository";
import { IRoomsAndSpacesService } from "../services/interface/IRoomsAndSpacesService";
import { IRoomsAndSpacesController } from "../controllers/interface/IRoomsAndSpacesController";
import { RoomsAndSpacesRepository } from "../repositories/implementation/RoomsAndSpacesRepository";
import { RoomsAndSpacesController } from "../controllers/implementation/RoomsAndSpacesController";
import { RoomsAndSpaces } from "../models/implementation/RoomsAndSpacesModel";
import { RoomsAndSpacesService } from "../services/implementation/RoomsAndSpacesService";


const router = express.Router();

const roomsAndSpacesRepository: IRoomsAndSpacesRepository = new RoomsAndSpacesRepository(RoomsAndSpaces);
const roomsAndSpacesService: IRoomsAndSpacesService = new RoomsAndSpacesService(roomsAndSpacesRepository);
const roomsAndSpacesController: IRoomsAndSpacesController = new RoomsAndSpacesController(roomsAndSpacesService);

router.post(
    "/add-rooms-spaces",
    roomsAndSpacesController.addRoomsAndSpaces
);

export default router;