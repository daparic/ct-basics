function combineRanges(ranges) {
    const combined = {};
    for (const r of ranges) {
        for (var i = r[0]; i <= r[1]; i++) {
            if (!combined[i]) {
                combined[i] = [i, i, r[2]];
            } else {
                combined[i][2] = Math.max(combined[i][2], r[2]);
            }
        }
    }
    const optimized = [];
    var range = [];
    for (const c in combined) {
        if (range.length === 0) {
            range = combined[c];
        } else if (combined[c][0] - range[1] > 1) {
            optimized.push(range);
            range = combined[c];
        } else if (range[2] === combined[c][2]) {
            range[1] = combined[c][1];
        } else if (range[2] !== combined[c][2]) {
            optimized.push(range);
            range = combined[c];
        }
    }
    if (range.length > 0) {
        optimized.push(range);
    }
    return optimized;
}

function getColorClass(code) {
    if (code === 2) {
        return "notcovered";
    } else if (code === 1) {
        return "partiallycovered";
    } else if (code === 3) {
        return "suppressed";
    } else {
        return "covered";
    }
}

function cleanHTML(text) {
    text = text.replace(/&/g, '&amp;');
    text = text.replace(/</g, '&lt;');
    text = text.replace(/>/g, '&gt;');
    return text;
}

function toggleSideBar(metric, state, metricPosition) {
    // toggle side-bar header
    const codeboxHeader = document.getElementById('codebox-header');
    if (state) {
        const th = document.createElement("th");
        th.id = "hdr-" + metric;
        th.style.width = "1px";
        th.innerHTML = metric;
        codeboxHeader.insertBefore(th, codeboxHeader.childNodes[metricPosition]);
    } else {
        for (const c of codeboxHeader.children) {
            if (c.id === "hdr-" + metric) {
                codeboxHeader.removeChild(c);
            }
        }
    }
    // toggle side-bar body
    const codeboxRows = document.getElementById('codebox-body').children;
    for (const r of codeboxRows) {
        if (state) {
            const td = document.createElement("td");
            td.className = "cov-" + metric;
            if (r.lastChild.id.startsWith("line-")) {
                lineKey = r.lastChild.id.substring("line-".length);
                if (lineKey in covSymbols && metric in covSymbols[lineKey]) {
                    var innerHTML = "";
                    for (const s of covSymbols[lineKey][metric]) {
                        innerHTML += ("<span class='" + getColorClass(s[1]) + "'>" + s[0] + "</span>");
                    }
                    td.innerHTML = innerHTML;
                }
            }
            r.insertBefore(td, r.childNodes[metricPosition]);
        } else {
            for (const c of r.children) {
                if (c.classList.contains("cov-" + metric)) {
                    r.removeChild(c);
                }
            }
        }
    }
}

function toggleAnnotation(id) {
    var annotationCollapsible = document.getElementById(id);
    if (annotationCollapsible) {
        annotationCollapsible.classList.toggle("hid-tgl");
    }
}

function expandAllAnnotations() {
    var inlineHintCollapsibles = document.getElementsByClassName('annotation-tgl');
    for (var i = 0; i < inlineHintCollapsibles.length; i++) {
        if (inlineHintCollapsibles[i].classList.contains("hid-tgl")) {
            inlineHintCollapsibles[i].classList.toggle("hid-tgl");
        }
    }
}

function collapseAllAnnotations() {
    var inlineHintCollapsibles = document.getElementsByClassName('annotation-tgl');
    for (var i = 0; i < inlineHintCollapsibles.length; i++) {
        if (!inlineHintCollapsibles[i].classList.contains("hid-tgl")) {
            inlineHintCollapsibles[i].classList.toggle("hid-tgl");
        }
    }
}

function initDecorations() {
    for (const m in enabledMetrics) {
        document.getElementById("checkbox-" + m).checked = true;
        updateDecorations(m, true);
        break;
    }
}

function updateDecorations(metric, enabled) {
    if (enabledMetrics[metric] === enabled) {
        return;
    }

    metricPosition = 0;
    for (const m in enabledMetrics) {
        if (m === metric) {
            break;
        }
        if (enabledMetrics[m]) {
            metricPosition++;
        }
    }
    toggleSideBar(metric, enabled, metricPosition);

    enabledMetrics[metric] = enabled;
    const codeElements = document.getElementsByClassName("code");
    for (const child of codeElements) {
        if (!child.id.startsWith("line-")) {
            continue;
        }
        lineKey = child.id.substring("line-".length);
        rangesToShow = [];
        for (const m in enabledMetrics) {
            if (enabledMetrics[m]) {
                if (lineKey in covRanges && m in covRanges[lineKey]) {
                    rangesToShow = rangesToShow.concat(covRanges[lineKey][m]);
                }
            }
        }
        const text = child.textContent;
        if (rangesToShow.length === 0) {
            child.innerHTML = cleanHTML(text);
            continue;
        }
        const r = combineRanges(rangesToShow);
        if (r) {
            var newText = "";
            var startPos = 0;
            for (const pos of r) {
                newText += text.substring(startPos, pos[0]) + "<span class='" + getColorClass(pos[2]) + "'>" + cleanHTML(text.substring(pos[0], pos[1] + 1)) + "</span>";
                startPos = pos[1] + 1;
            }
            if (startPos < text.length) {
                newText += cleanHTML(text.substring(startPos));
            }
            child.innerHTML = newText;
        } else {
            child.innerHTML = cleanHTML(text);
        }
    }
}

function sortStats(event, compareFunction) {
    const th = event.currentTarget;
    const colIdx = Array.from(th.parentElement.children).indexOf(th);
    const table = th.closest('table');
    const tbody = table.tBodies[0];
    const direction = tbody.getAttribute('sort-direction') === 'asc' ? 'desc' : 'asc';
    tbody.setAttribute('sort-direction', direction);
    const rows = Array.from(tbody.rows);
    rows.sort((a, b) => {
        const aText = a.children[colIdx].textContent.trim();
        const bText = b.children[colIdx].textContent.trim();
        return compareFunction(aText, bText, direction);
    });
    rows.forEach(rows => tbody.appendChild(rows));
    for (const child of th.parentElement.children) {
        child.innerHTML = child.innerHTML.replace(/\u25b4|\u25be/g, '');
        if (child === th) {
            child.innerHTML = (direction === 'asc' ? '\u25b4' : '\u25be') + child.innerHTML;
        }
    }
}

function sortPercentage(event) {
    sortStats(event, (aText, bText, direction) => {
        const getPercentage = (statString) => {
            const percPos = statString.indexOf('%');
            if (percPos === -1) {
                return -1;
            } else {
                return parseInt(statString.substring(0, percPos));
            }
        }
        const aPercentage = getPercentage(aText);
        const bPercentage = getPercentage(bText);
        var order = (direction === 'asc') ? aPercentage - bPercentage : bPercentage - aPercentage;
        if (order === 0) {
            const getTotal = (statString) => {
                const divPos = statString.indexOf('/');
                if (divPos === -1) {
                    return -1;
                } else {
                    return parseInt(statString.substring(divPos + 1).trim());
                }
            }
            const aTotal = getTotal(aText);
            const bTotal = getTotal(bText);
            order = (direction === 'asc') ? aTotal - bTotal : bTotal - aTotal;
        }
        return order;
    });
}

function sortName(event) {
    sortStats(event, (aText, bText, direction) => {
        return (direction === 'asc') ? aText.localeCompare(bText) : bText.localeCompare(aText);
    });
}
