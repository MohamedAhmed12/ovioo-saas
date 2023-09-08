"use client";

import "@/styles/components/dashboard/layout/ovioo-table.scss";
import DownloadIcon from "@mui/icons-material/Download";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";

export default function OviooTable({
    headers,
    rows,
    ...props
}: {
    headers: string[];
    rows: {
        plan: string;
        unitCost: number;
        quantity: number;
    }[];
    props: any;
}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper className="ovioo-table flex flex-col dark:shadow-md dark:shadow-slate-300">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell key={header} className="uppercase font-semibold">
                                    {header}
                                </TableCell>
                            ))}
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow key={row.plan}>
                                <TableCell>{row.plan}</TableCell>
                                <TableCell>{row.unitCost}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.unitCost * row.quantity}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        className="download-btn"
                                    >
                                        <DownloadIcon />
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
