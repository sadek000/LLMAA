import { useRecoilValue } from "recoil";
import { permissionsState } from "state/atoms";

// Utility function to check permission
export const useHasPermission = (permission: string): boolean => {
  const permissions = useRecoilValue(permissionsState);
  return permissions[permission] === true;
};
