import * as React from "react";
import { AlertDialog } from "@base-ui-components/react/alert-dialog";
import { Dialog } from "@base-ui-components/react/dialog";
import styles from "../css/ModalForms.module.css";

// Definindo as propriedades que o componente receberá do pai
type ModalFormsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: { food: string; amount: number, mealType: string}) => void;
};



export default function ModalForms({ open, onOpenChange, onSubmit }: ModalFormsProps) {
  
  // 1. O estado de visibilidade 'dialogOpen' foi REMOVIDO. Usaremos a prop 'open'.
  
  // 2. O estado dos inputs e da confirmação continuam locais, o que está correto.
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [amountValue, setAmountValue] = React.useState("");
  const [mealTypeValue, setMealTypeValue] = React.useState("BREAKFAST");


React.useEffect(() => {
  // Este efeito será executado toda vez que a prop 'open' mudar.
  if (!open) {
    // Se o novo valor de 'open' for 'false' (ou seja, o modal está fechando),
    // nós limpamos os estados dos inputs.
    setInputValue("");
    setAmountValue("");
    // O estado de confirmação também pode ser resetado aqui por segurança.
    setConfirmationOpen(false);
  }
}, [open]);



  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Formulário enviado com:", { food: inputValue, amount: Number(amountValue), mealType: mealTypeValue });
    // 3. CHAMA A FUNÇÃO DO PAI com os dados dos inputs
    onSubmit({ food: inputValue, amount: Number(amountValue), mealType: mealTypeValue });
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && (inputValue || amountValue)) {
      setConfirmationOpen(true);
    } else {
      // Limpa os campos ao fechar e avisa o pai
      setInputValue("");
      setAmountValue("");
      setMealTypeValue("");
      onOpenChange(isOpen);
    }
  };

  return (
    <>
      {/* 4. O Dialog.Root agora é controlado 100% pelas props do pai */}
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        {/* 5. O Dialog.Trigger foi REMOVIDO, pois o pai agora tem o botão de abrir */}
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.Backdrop} />
          <Dialog.Popup className={styles.Popup}>
            <Dialog.Title className={styles.Title}>Novo Registro</Dialog.Title>
            <form
              className={styles.TextareaContainer}
              onSubmit={handleFormSubmit} // Lógica de submissão corrigida
            >
              <label htmlFor="alimento" className={styles.Label}>
                Alimento:
                {/* 6. Inputs agora são totalmente controlados com 'onChange' */}
                <input
                  id="alimento"
                  type="text"
                  required
                  className={styles.Input}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </label>
              <label htmlFor="quantidade" className={styles.Label}>
                Quantidade (g):
                <input
                  id="quantidade"
                  type="number"
                  required
                  className={styles.Input}
                  value={amountValue}
                  onChange={(e) => setAmountValue(e.target.value)}
                />
              </label>
              <label htmlFor="" className={styles.Label}> {/*! FORMATAR E DEIXAR BONITO!!!! */}
                Tipo
                <select name="" id="" value={mealTypeValue} onChange={(e) => setMealTypeValue(e.target.value)} className={styles.Select}>
                  <option value="BREAKFAST">Café da Manhã</option>
                  <option value="LUNCH">Almoço</option>
                  <option value="DINNER">Jantar</option>
                  <option value="SNACK">Lanche</option>
                </select>
              </label>
              <div className={styles.Actions}>
                {/* O Dialog.Close já aciona onOpenChange(false) por padrão */}
                <Dialog.Close className={styles.Button}>Cancelar</Dialog.Close>
                <button type="submit" className={styles.Button}>
                  Registrar
                </button>
              </div>
            </form>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Lógica do AlertDialog de confirmação */}
      <AlertDialog.Root
        open={confirmationOpen}
        onOpenChange={setConfirmationOpen}
      >
        <AlertDialog.Portal>
          <AlertDialog.Popup className={styles.Popup}>
            <AlertDialog.Title>Descartar Registro?</AlertDialog.Title>
            <AlertDialog.Description>
              As informações inseridas serão perdidas.
            </AlertDialog.Description>
            <div className={styles.Actions}>
              <AlertDialog.Close className={styles.Button}>
                Voltar
              </AlertDialog.Close>
              <button
                type="button"
                className={styles.Button}
                onClick={() => {
                  setConfirmationOpen(false);
                  onOpenChange(false); // Avisa o pai para fechar o modal principal
                }}
              >
                Descartar
              </button>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}


/* import * as React from "react";
import { AlertDialog } from "@base-ui-components/react/alert-dialog";
import { Dialog } from "@base-ui-components/react/dialog";
import styles from "../css/ModalForms.module.css";

type ModalFormsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: { food: string; amount: string }) => void;
};

export default function ModalForms({
  open,
  onOpenChange,
  onSubmit,
}: ModalFormsProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [inputValue, setinputValue] = React.useState("");
  const [amountValue, setAmountValue] = React.useState("");

  const handleFoodSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ food: inputValue, amount: amountValue });
    setinputValue("");
    setAmountValue("");
  };

  const handleOpenChange = (isOpen: boolean) => {
    // Se o usuário tentar fechar o modal e houver texto, mostre a confirmação
    if (!isOpen && (inputValue || amountValue)) {
      setConfirmationOpen(true);
    } else {
      // Caso contrário, apenas informa o pai sobre a mudança de estado
      onOpenChange(isOpen);
    }
  };

  return (
    <Dialog.Root
      open={dialogOpen}
      onOpenChange={handleOpenChange}
    >
      <Dialog.Trigger className={styles.Button}>Registrar</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Popup className={styles.Popup}>
          <Dialog.Title className={styles.Title}>Novo Registro</Dialog.Title>
          <form
            className={styles.TextareaContainer}
            onSubmit={(event) => {
              event.preventDefault();
              setDialogOpen(false);
            }}
          >
            <label htmlFor="" className={styles.Label}>
              Alimento:
              <input
                type="text"
                required
                className={styles.Input}
                value={inputValue}
              />
            </label>
            <label htmlFor="" className={styles.Label}>
              Quantidade:
              <input type="number" required className={styles.Input} />
            </label>
            <div className={styles.Actions}>
              <Dialog.Close className={styles.Button}>Cancelar</Dialog.Close>
              <button type="submit" className={styles.Button}>
                Registrar
              </button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>

      <AlertDialog.Root
        open={confirmationOpen}
        onOpenChange={setConfirmationOpen}
      >
        <AlertDialog.Portal>
          <AlertDialog.Popup className={styles.Popup}>
            <AlertDialog.Title className={styles.Title}>
              Discard tweet?
            </AlertDialog.Title>
            <AlertDialog.Description className={styles.Description}>
              Your tweet will be lost.
            </AlertDialog.Description>
            <div className={styles.Actions}>
              <AlertDialog.Close className={styles.Button}>
                Go back
              </AlertDialog.Close>
              <button
                type="button"
                className={styles.Button}
                onClick={handleFoodSubmit}
              >
                Discard
              </button>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </Dialog.Root>
  );
}
 */