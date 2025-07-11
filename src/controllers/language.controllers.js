import { Language } from "../models/language.model.js";

export const getAll = async (req, res) => {
  try {
    const getAll = await Language.findAll();
    return res.status(200).json(getAll);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error al obtener los lenguajes" });
  }
};

export const getById = async (req, res) => {
  const id = req.params.id;

  if (isNaN(id) || Math.round(id) != id) {
    return res.status(400).json({ message: "El id debe ser un número entero" });
  }

  try {
    const getById = await Language.findByPk(id);
    if (getById) {
      return res.status(200).json(getById);
    } else {
      return res.status(404).json({ message: "Lenguaje no encontrado" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error al buscar el lenguaje por ID" });
  }
};

export const createLanguage = async (req, res) => {
  const { name, paradigm, release_year } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "El nombre no puede estar vacío" });
  }

  if (!paradigm || paradigm.trim() === "") {
    return res.status(400).json({ message: "El paradigma no puede estar vacío" });
  }

  try {
    const uniqueName = await Language.findOne({ where: { name } });
    if (uniqueName) {
      return res.status(400).json({ message: "Ya existe un lenguaje con ese nombre" });
    }

    const newLang = await Language.create({ name, paradigm, release_year });
    return res.status(201).json(newLang);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error al crear el lenguaje" });
  }
};

export const updateLanguage = async (req, res) => {
  const { name, paradigm, release_year } = req.body;
  const id = req.params.id;

  if (isNaN(id) || Math.round(id) != id) {
    return res.status(400).json({ message: "El id debe ser un número entero" });
  }

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "El nombre no puede estar vacío" });
  }

  if (!paradigm || paradigm.trim() === "") {
    return res.status(400).json({ message: "El paradigma no puede estar vacío" });
  }

  try {
    const existingLang = await Language.findByPk(id);
    if (!existingLang) {
      return res.status(404).json({ message: "Lenguaje no encontrado" });
    }

    const nameTaken = await Language.findOne({
      where: { name },
    });

    if (nameTaken && nameTaken.id !== Number(id)) {
      return res.status(400).json({ message: "Ya existe un lenguaje con ese nombre" });
    }

    await Language.update({ name, paradigm, release_year }, { where: { id } });
    const updatedLang = await Language.findByPk(id);
    return res.status(200).json(updatedLang);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error al actualizar el lenguaje" });
  }
};

export const deleteLanguage = async (req, res) => {
  const id = req.params.id;

  if (isNaN(id) || Math.round(id) != id) {
    return res.status(400).json({ message: "El id debe ser un número entero" });
  }

  try {
    const lang = await Language.findByPk(id);
    if (!lang) {
      return res.status(404).json({ message: "Lenguaje no encontrado" });
    }

    await Language.destroy({ where: { id } });
    return res.status(200).json({ message: "Lenguaje eliminado con éxito" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error al eliminar el lenguaje" });
  }
};
