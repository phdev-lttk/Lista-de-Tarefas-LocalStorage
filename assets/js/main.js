function mainScope() {
    const inputTarefa = document.querySelector(".input-tarefa");
    const btnTarefa = document.querySelector(".btn-tarefa");
    const tarefas = document.querySelector(".tarefas");

    function clearInput() {
        inputTarefa.value = "";
        inputTarefa.focus();
    }

    function createLiEl() {
        const li = document.createElement("li");
        return li;
    }

    function createBtnDelete(li) {
        li.innerText += " ";

        const btnDel = document.createElement("button");
        btnDel.innerText = "✕";
        btnDel.setAttribute("class", "apagar");
        btnDel.setAttribute("title", "Apagar esta tarefa");

        li.appendChild(btnDel);
    }

    function createTask(textoInput) {
        const li = createLiEl();
        li.innerText = textoInput;
        tarefas.appendChild(li);

        createBtnDelete(li);
        clearInput();
        saveTasks();
    }

    function saveTasks() {
    const liTarefas = tarefas.querySelectorAll("li");
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace("✕", "").trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem("tarefas", tarefasJSON);
    }

    function addSavedTasks() {
        const tarefasSalvas = localStorage.getItem("tarefas");

        if (!tarefasSalvas) return;

        const listaDeTarefas = JSON.parse(tarefasSalvas);

        for (let tarefa of listaDeTarefas) {
            createTask(tarefa);
        }
    }

    btnTarefa.addEventListener("click", () => {
        if (!inputTarefa.value) return;
        createTask(inputTarefa.value);
    });

    inputTarefa.addEventListener("keypress", function (e) {
        if (e.key === "Enter") { // melhor que keyCode
            if (!inputTarefa.value) return;
            createTask(inputTarefa.value);
        }
    });

    document.addEventListener("click", function (e) {
        const el = e.target;

        if (el.classList.contains("apagar")) {
            el.parentElement.remove();
            saveTasks();
        }
    });

    addSavedTasks();
}

mainScope();