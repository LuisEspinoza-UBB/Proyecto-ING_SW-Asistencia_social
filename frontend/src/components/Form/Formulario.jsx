import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
import { rutValidator } from "./validator";
import { FaTrash } from "react-icons/fa";
import './Formulario.css';

const BASE_URL = 'http://localhost:3000/api';
const fileTypes = ["PDF"];

const Formulario = () => {
    const { register, formState: { errors }, handleSubmit, watch, reset  } = useForm();
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const cantidadConvivientes = watch('cantidad_convivientes', '');

    const handleChange = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

        // Crear una matriz de nombres de archivos
        const fileNames = Array.from(newFiles).map((file) => file.name);

        // Actualizar el estado con los nombres de los archivos
        setSelectedFiles((prevFileNames) => [...prevFileNames, ...fileNames]);
    };

    const onSubmit = async (fichaForm) => {
        const fichaProteccion = getObjFichaProteccion(fichaForm);

        if (files && files.length === 0) {
            alert('Debe ingresar al menos un archivo.')
            return;
        }

        try {
            // Guardar Ficha
            const { data } = await axios.post(`${ BASE_URL }/ficha`, fichaProteccion);
            const ficha = data.ficha;
            const { _id: fichaId } = ficha;

            // Guardar archivos asociados a ficha
            const formData = new FormData();
            [...files].forEach(file => {
                formData.append('files', file);
            });

            await axios.post(`${ BASE_URL }/file-upload/${ fichaId }`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data'
                },
            });

            reset();
            setFiles([]);
            setSelectedFiles([]);
            alert('Formulario enviado exitosamente!');
          } catch (error) {
            console.log('Error fetching data:', error);
          }
    }

    const getObjFichaProteccion = (data) => {
        const {
            nombres,
            apellidos,
            rut,
            fecha_nacimiento,
            telefono,
            estado_civil,
            ingresos,
            ocupacion,
            direccion,
            cantidad_piezas,
            cantidad_banios,
            tipo_propiedad,
            ...rest
        } = data;

        const domicilio = {
            direccion,
            cantidadPiezas: cantidad_piezas,
            cantidadBanios: cantidad_banios,
            tipoPropiedad: tipo_propiedad,
            cantidadConvivientes
        };

        const fichaProteccion = {
            nombres,
            apellidos,
            rut,
            fechaNacimiento: fecha_nacimiento,
            telefono,
            estadoCivil: estado_civil,
            ingresos,
            ocupacion,
            domicilio,
            personasEnHogar: []
        };

        if (cantidadConvivientes > 0) {
            Array.from({ length: cantidadConvivientes }).map((_, index) => {
                fichaProteccion.personasEnHogar.push({
                    nombres: data.nombresGh[index],
                    apellidos: data.apellidosGh[index],
                    rut: data.rutGh[index],
                    fechaNacimiento: data.fecha_nacimientoGh[index],
                    telefono: data.telefonoGh[index],
                    estadoCivil: data.estado_civilGh[index],
                    ingresos: data.ingresosGh[index],
                    ocupacion: data.ocupacionGh[index],
                });
            });
        }

        return fichaProteccion;
    }

    const deleteFile = (idx) => {
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(idx, 1);
            return updatedFiles;
        });

        setSelectedFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(idx, 1);
            return updatedFiles;
        });
    }

    const handleKeyDown = (e) => {
        const keyCode = e.keyCode || e.which;
        const allowedKeys = [8, 9, 37, 39, 46];
        const isDigit = (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
    
        // Verificar si la tecla está permitida
        if (!(isDigit || allowedKeys.includes(keyCode))) {
          e.preventDefault();
        }
      };

    return (
        <div className="content-form">
            <h1>Formulario</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Nombres</label>
                    <input type="text" {...register('nombres', {
                        required: true,
                        maxLength: 10
                    })} />
                </div>
                {errors.nombres?.type === 'required' && <p>El Campo nombre es requerido</p>}

                <div>
                    <label>Apellidos</label>
                    <input type="text" {...register('apellidos', {
                        required: true,
                        maxLength: 10
                    })} />
                </div>
                {errors.apellidos?.type === 'required' && <p>El Campo apellidos es requerido</p>}

                <div>
                    <label>RUT</label>
                    <input type="text" {...register('rut', {
                        required: true,
                        maxLength: 10,
                        validate: rutValidator
                    })} />
                </div>
                {errors.rut?.type === 'required' && <p>El Campo RUT es requerido</p>}
                {errors.rut?.type === 'validate' && <p>El Campo RUT inválido</p>}
             
                <div>
                    <label>Fecha de nacimiento</label>
                    <input type="date" {...register('fecha_nacimiento', {
                        required: true
                    }
                    )} />
                </div>
                {errors.fecha_nacimiento?.type === 'required' && <p>El Campo fecha nacimiento es requerido</p>}

                <div>
                    <label>Teléfono</label>
                    <input type="text" onKeyDown={handleKeyDown} {...register('telefono', {
                        required: true
                    }
                    )} />
                </div>
                {errors.telefono?.type === 'required' && <p>El Campo telefono es requerido</p>}

                <div>
                    <label>Estado Civil</label>
                    <select {...register('estado_civil', { 
                        required: true
                    })}>
                        <option value="soltero">Solter@</option>
                        <option value="casado">Casad@</option>
                        <option value="divorciado">Divorciad@</option>
                        <option value="viudo">Viud@</option>
                    </select>
                </div>
                {errors.estado_civil?.type === 'required' && <p>El Campo estado civil es requerido</p>}

                <div>
                    <label>Ingresos</label>
                    <input type="text" onKeyDown={handleKeyDown} {...register('ingresos', {
                        required: true
                    }
                    )} />
                </div>
                {errors.ingresos?.type === 'required' && <p>El Campo ingresos es requerido</p>}

                <div>
                    <label>Ocupación</label>
                    <input type="text" {...register('ocupacion', {
                        required: true
                    }
                    )} />
                </div>
                {errors.ocupacion?.type === 'required' && <p>El Campo ocupacion es requerido</p>}

                <h2>Información de Domicilio</h2>
                <div>
                    <label>Dirección</label>
                    <input type="text" {...register('direccion', {
                        required: true
                    }
                    )} />
                </div>
                {errors.direccion?.type === 'required' && <p>El Campo direccion es requerido</p>}

                <div>
                    <label>Cantidad piezas</label>
                    <input type="text" onKeyDown={handleKeyDown} {...register('cantidad_piezas', {
                        required: true
                    }
                    )} />
                </div>
                {errors.cantidad_piezas?.type === 'required' && <p>El Campo cantidad de piezas es requerido</p>}

                <div>
                    <label>Cantidad de baños</label>
                    <input type="text" onKeyDown={handleKeyDown} {...register('cantidad_banios', {
                        required: true
                    }
                    )} />
                </div>
                {errors.cantidad_banios?.type === 'required' && <p>El Campo direccion es requerido</p>}

                <div>
                    <label>¿En qué tipo de propiedad reside? </label>
                    <select {...register('tipo_propiedad')}>
                        <option value="propietario">Propietario</option>
                        <option value="arrendatario">Arrendatario</option>
                        <option value="usufructuario">Usufructuario</option>
                    </select>
                </div>

                <div>
                    <label>¿Con cuántas personas convive?</label>
                    <input type="text" onKeyDown={handleKeyDown} {...register('cantidad_convivientes', {
                        required: true,
                        pattern: /^\d+$/
                    }
                    )} />
                </div>
                {errors.cantidad_convivientes?.type === 'required' && <p>Este campo es requerido</p>}

                { cantidadConvivientes > 0 && (
                    <>
                    <h2>Información Grupo Hogar</h2>

                    { Array.from({ length: cantidadConvivientes }).map((_, index) => (
                        <span key={index}>
                            <h3>Persona { index + 1 }</h3>
                            <div>
                                <label>Nombres</label>
                                <input
                                type="text"
                                {...register(`nombresGh[${index}]`, {
                                    required: true,
                                    maxLength: 10
                                })}
                                />
                            </div>
                            {errors[`nombresGh[${index}]`]?.type === 'required' && (
                                <p> El Campo nombre es requerido </p>
                            )}

                            <div>
                                <label>Apellidos</label>
                                <input type="text" {...register(`apellidosGh[${index}]`, {
                                    required: true,
                                    maxLength: 10
                                })} />
                            </div>
                            {errors[`apellidosGh[${index}]`]?.type === 'required' && (
                                <p> El Campo apellidos es requerido </p>
                            )}

                            <div>
                                <label>RUT</label>
                                <input type="text" {...register(`rutGh[${index}]`, {
                                    required: true,
                                    maxLength: 10,
                                    validate: rutValidator
                                })} />
                            </div>
                            {errors[`rutGh[${index}]`]?.type === 'required' && (
                                <p> El Campo RUT es requerido </p>
                            )}
                            {errors[`rutGh[${index}]`]?.type === 'validate' && <p>El Campo RUT inválido</p>}

                            <div>
                                <label>Fecha de nacimiento</label>
                                <input type="date" {...register(`fecha_nacimientoGh[${index}]`, {
                                    required: true
                                }
                                )} />
                            </div>
                            {errors[`fecha_nacimientoGh[${index}]`]?.type === 'required' && <p>El Campo fecha nacimiento es requerido</p>}

                            <div>
                                <label>Estado Civil</label>
                                <select {...register(`estado_civilGh[${index}]`)}>
                                    <option value="soltero">Solter@</option>
                                    <option value="casado">Casad@</option>
                                    <option value="divorciado">Divorciad@</option>
                                    <option value="viudo">Viud@</option>
                                </select>
                            </div>
                            <div>
                                <label>Teléfono</label>
                                <input type="text" onKeyDown={handleKeyDown} {...register(`telefonoGh[${index}]`, {
                                    required: true
                                }
                                )} />
                            </div>
                            {errors[`telefonoGh[${index}]`]?.type === 'required' && (
                                <p> El Campo teléfono es requerido</p>
                            )}

                            <div>
                                <label>Ingresos</label>
                                <input type="text" onKeyDown={handleKeyDown} {...register(`ingresosGh[${index}]`, {
                                    required: true
                                }
                                )} />
                            </div>
                            {errors[`ingresosGh[${index}]`]?.type === 'required' && (
                                <p> El Campo ingresos es requerido</p>
                            )}

                            <div>
                                <label>Ocupación</label>
                                <input type="text" {...register(`ocupacionGh[${index}]`, {
                                    required: true
                                }
                                )} />
                            </div>
                            {errors[`ocupacionGh[${index}]`]?.type === 'required' && (
                                <p> El Campo ocupación es requerido</p>
                            )}
                        </span>
                    ))}
                    </>
                )}

                <h2>Subida de Archivos</h2>
                <FileUploader 
                    handleChange={handleChange} name="file" 
                    types={fileTypes} multiple={true}
                    label="Sube o suelta los archivos aquí" />

                {selectedFiles.map((file, index) => (
                    <div key={index} className="info-file">
                        <span>{file}</span>
                        <button type="buton" onClick={() => deleteFile(index)}>
                            <FaTrash />
                        </button>
                    </div>
                ))}

                <input type="submit" value="Enviar" className="btn-submit"/>
            </form>

        </div>
    );
}

export default Formulario;