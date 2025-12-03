import { Skapi } from "skapi-js"

const serviceId = import.meta.env.VITE_SKAPI_SERVICE_ID;

if (!serviceId) {
  throw new Error('VITE_SKAPI_SERVICE_ID is not defined in environment variables');
}

const skapi = new Skapi(serviceId);

export { skapi }

